import json
from django.http import JsonResponse
from django.shortcuts import render
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import update_session_auth_hash
from base.models import MoviePoster

from datetime import date, datetime
from user.models import History, UserRating, Watchlist
from plan.models import Subscription
from .forms import UserRegisterForm, UserProfileForm, UserPasswordChangeForm
from django.contrib import messages

import stripe

# Create your views here.

# login
def userlogin(request):

    if request.user.is_authenticated:
        return redirect('user:profile')


    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password1']

        try:
            user = User.objects.get(username=username)
        except:
           messages.error( request, 'username')
           return redirect('user:login')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return redirect('user:profile')
        else:
            messages.error(request, 'password')
            return redirect('user:login')
    
    return render(request, 'login.html')

# logout
def userlogout(request):
    logout(request)
    return redirect('base:home')

# register
def userregister(request):

    if request.user.is_authenticated:
        return redirect('user:profile')

    form = UserRegisterForm()
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
       
        if form.is_valid():
            user = form.save(commit=False)
            user.username = user.username.lower()
            user.email = user.email.lower()
            user.save()

            login(request, user)

            return redirect('user:profile')
        else: 
            username = request.POST.get('username')
            email = request.POST.get('email')
            if User.objects.filter(username = username).exists():
                messages.error(request, 'username')
            elif User.objects.filter(email = email).exists():
                messages.error(request, 'password')

    context = {
        'form' : form
    }

    return render(request, 'register.html', context)


# profile
@login_required(login_url='user:login')
def profile(request):
    profile = request.user.profile
    
    form1 = UserProfileForm(instance=profile)

    if request.method == 'POST' and 'save' in request.POST:
        form1 = UserProfileForm(request.POST, instance=profile)
        username = request.POST['username']
        email = request.POST['email']
        
        if profile.username != username or profile.email != email:

            username = request.POST.get('username')
            email = request.POST.get('email')
            error = 2
            if profile.username != username:
                if User.objects.filter(username = username).exists():
                    messages.error(request, 'username')

                    return redirect('user:profile')
                else: error-=1
            else: error -=1
            if profile.email != email:
                if User.objects.filter(email = email).exists():
                    messages.error(request, 'password')

                    return redirect('user:profile')
                else: error-=1
            else: error -=1
            if error == 0:
                if form1.is_valid():
                    user = form1.save(commit=False)
                    user.username = user.username.lower()
                    user.email = user.email.lower()
                    user.save()
                    return redirect('user:profile')

        else: form1.save()

    else: 
        form1 = UserProfileForm(instance=profile)

    
    if request.method == 'POST' and 'change' in request.POST:

        form2 = UserPasswordChangeForm(request.user, request.POST)
        password = request.POST['old_password']

        if form2.is_valid():
            form2save = form2.save()
            update_session_auth_hash(request, form2save)

            return redirect('user:profile')
            
        else:

            messages.error(request, 'old_password')
            return redirect('user:profile')
    else:

        form2 = UserPasswordChangeForm(request.user)

    watchlistUser = Watchlist.objects.filter(user = request.user)
    l = []
    for movie in watchlistUser:
        l.append(movie.slug)

    watchlist = MoviePoster.objects.filter(movie__slug__in = l)


    historyUser = History.objects.filter(user = request.user)
    date = historyUser.values_list('date', flat=True).order_by('-date').distinct()
    history= []
    lenth = 0
    for movie in date:
        history.append([])
        if len(history) > 1:
            lenth = len(history)
            lenth = lenth - 1
        else: 
            pass
        for h in historyUser:
            if movie == h.date:
                history[lenth].append(MoviePoster.objects.get(movie__slug = h.slug))
                
    
    if Subscription.objects.filter(user = request.user).exists():
        subscriptionUser = Subscription.objects.get(user = request.user)
        plan = subscriptionUser.plan
        try:
            retrieve = stripe.Subscription.retrieve(subscriptionUser.stripe_subscription)
            created = datetime.fromtimestamp(retrieve.created).date()
            current_period_end = datetime.fromtimestamp(retrieve.current_period_end).date()

        except: 
            created = '-- -- ----'
            current_period_end = '-- -- ----'
    else:
        plan = 'Null'
        created = '-- -- ----'
        current_period_end = '-- -- ----'
    

    context = {
        'profile': profile,
        'form1': form1,
        'form2': form2,
        'watchlist': watchlist,
        'history': history,
        'date' : date,
        'plan': str(plan),
        'created' : created,
        'current_period_end' : current_period_end
    }

    return render(request, 'profile.html', context)


# watchlist
@csrf_exempt
@login_required
def watchlist(request):
    if request.method=="POST":
        data = json.loads(request.body)
        slug = MoviePoster.objects.get(id = data['posterId']).movie.slug
        try:
            if Watchlist.objects.filter(slug = slug).exists():
                list = Watchlist.objects.filter(user = request.user)
                for watch in list:
                    if watch.slug == slug:
                        watch.delete()
                        break
                    else: pass
            else:
                watchlist = Watchlist(
                    user = request.user,
                    type = data['whatType'],
                    slug = slug
                )
                watchlist.save()
        except:
            print("watchlist error")
        return JsonResponse({'watchlist':'success'}, status = 200)


# add history
@csrf_exempt
@login_required
def addHistory(request):
    if request.method == "POST":
        user = History.objects.filter(user = request.user)
        data = json.loads(request.body)
        slug = MoviePoster.objects.get(id = data['posterId']).movie.slug
        history = False
        if History.objects.filter(user = request.user).exists():
            for l in user:
                if l.slug == slug and l.date == date.today():
                    history = True
                else: history = False
        else: history = False

        if history == False:
            his = History(
                user = request.user,
                date = date.today(),
                type = data['whatType'],
                slug = slug
            )
            his.save()
        else: pass
    return JsonResponse({'addHistory':'success'}, status = 200)


# clear history
@csrf_exempt
@login_required
def clearHistory(request):
    if request.method == "POST":
        data = json.loads(request.body)
        slug = MoviePoster.objects.get(id = data['posterId']).movie.slug
        date = data['date']
        try: 
            format_date = datetime.strptime(date, '%b %d, %Y').strftime('%Y-%m-%d')
        except:
            format_date = datetime.strptime(date, '%B %d, %Y').strftime('%Y-%m-%d')

        list = History.objects.filter(user = request.user)
        for history in list:
            if history.slug == slug:

                if str(history.date) == str(format_date):

                    history.delete()
                    break
                else: print('date not match')
            else: pass

    return JsonResponse({'clearHistory':'success'}, status = 200)


# rating
@csrf_exempt
@login_required
def userRating(request):
    if request.method == "POST":
        data = json.loads(request.body)
        movie = MoviePoster.objects.get(id = data['posterId']).movie

        if UserRating.objects.filter(user = request.user, movie = movie).exists():
            user_rating = UserRating.objects.get(user = request.user, movie = movie)
            if user_rating.rating != data['rate']:
                user_rating.rating = data['rate']
                user_rating.save()
        else:
            rating = UserRating(
                user = request.user,
                type = data['whatType'],
                movie = movie,
                rating = data['rate']
            )
            rating.save()

    return JsonResponse({'hello':'success'}, status = 200)