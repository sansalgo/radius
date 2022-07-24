from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.db.models import Q
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
from plan.models import Subscription
from .utils import recommend


from user.models import Watchlist, UserRating
from .models import *
#from django.contrib.auth.forms import UserCreationForm


# Create your views here.


def home(request):    
    banners = MovieBanner.objects.all()

    try:
        recommended_for_you = recommend(request)
    except:
        recommended_for_you = MoviePoster.objects.all().order_by('-movie__rating')[:48]
    

    trending = MoviePoster.objects.all().order_by('-movie__release_date')[:48]


    action_and_adventure = MovieGenre.objects.filter(Q(genre__label='Action') | Q(genre__label='Adventure'))[:48]
    action_and_adventure_list = []
    for i in action_and_adventure:
        action_and_adventure_list.append(MoviePoster.objects.get(movie__slug = i.movie.slug))


    science_fiction = MovieGenre.objects.filter(genre__label='Sci-Fi')[:48]
    science_fiction_list = []
    for i in science_fiction:
        science_fiction_list.append(MoviePoster.objects.get(movie__slug = i.movie.slug))


    animation = MovieGenre.objects.filter(genre__label='Animation')[:24]
    animation_list = []
    for i in animation:
        animation_list.append(MoviePoster.objects.get(movie__slug = i.movie.slug))


    horror_and_thriller = MovieGenre.objects.filter(Q(genre__label='Horror') | Q(genre__label='Thriller'))[:48]
    horror_and_thriller_list = []
    for i in horror_and_thriller:
        horror_and_thriller_list.append(MoviePoster.objects.get(movie__slug = i.movie.slug))


    if request.user.is_authenticated:
        if Subscription.objects.filter(user = request.user).exists():
                subscriptionUser = Subscription.objects.get(user = request.user)
                plan = subscriptionUser.plan
        else: plan = 'Null'
    else: plan = 'Null'


    context = {
        'banners' : banners,
        'recommendedForYou' : recommended_for_you,
        'trending' : trending,
        'actionandAdventure' : action_and_adventure_list,
        'scienceFiction' : science_fiction_list,
        'animation' : animation_list,
        'horrorandthriller' : horror_and_thriller_list,
        'plan' : str(plan)
        }
    

    return render(request, 'home.html', context)



def movies(request):
    posters = MoviePoster.objects.all()


    genres,sort1,sort2 = '','',''
    if request.GET.get('genres') or request.GET.get('sort1') or request.GET.get('sort2'): 
        genres = request.GET.getlist('genres')
        sort1 = request.GET.get('sort1')
        sort2 = request.GET.get('sort2')
        
        genre_list = []
        for g in genres:
            for genre in MovieGenre.objects.filter(genre__label = g):
                genre_list.append(genre.movie.slug)

        # for filter
        if genre_list != []:

            if sort1 == 'ascending':

                if sort1 == 'ascending' and sort2 == 'title':
                    posters = MoviePoster.objects.filter(movie__slug__in = genre_list).order_by('movie__title')
                elif sort1 == 'ascending' and sort2 == 'release-date':
                    posters = MoviePoster.objects.filter(movie__slug__in = genre_list).order_by('movie__release_date')
                elif sort1 == 'ascending' and sort2 == 'rating':
                    posters = MoviePoster.objects.filter(movie__slug__in = genre_list).order_by('movie__rating')
                else:
                    posters = MoviePoster.objects.filter(movie__slug__in = genre_list).order_by('movie__title')

            elif sort1 == 'descending':

                if sort1 == 'descending' and sort2 == 'title':
                    posters = MoviePoster.objects.filter(movie__slug__in = genre_list).order_by('-movie__title')
                elif sort1 == 'descending' and sort2 == 'release-date':
                    posters = MoviePoster.objects.filter(movie__slug__in = genre_list).order_by('-movie__release_date')
                elif sort1 == 'descending' and sort2 == 'rating':
                    posters = MoviePoster.objects.filter(movie__slug__in = genre_list).order_by('-movie__rating')
                else:
                    posters = MoviePoster.objects.filter(movie__slug__in = genre_list).order_by('-movie__title')

            else:
                posters = MoviePoster.objects.filter(movie__slug__in = genre_list).order_by('movie__title')

        else:

            if sort1 == 'ascending':

                if sort1 == 'ascending' and sort2 == 'title':
                    posters = MoviePoster.objects.all().order_by('movie__title')
                elif sort1 == 'ascending' and sort2 == 'release-date':
                    posters = MoviePoster.objects.all().order_by('movie__release_date')
                elif sort1 == 'ascending' and sort2 == 'rating':
                    posters = MoviePoster.objects.all().order_by('movie__rating')
                else:
                    posters = MoviePoster.objects.all().order_by('movie__title')

            elif sort1 == 'descending':

                if sort1 == 'descending' and sort2 == 'title':
                    posters = MoviePoster.objects.all().order_by('-movie__title')
                elif sort1 == 'descending' and sort2 == 'release-date':
                    posters = MoviePoster.objects.all().order_by('-movie__release_date')
                elif sort1 == 'descending' and sort2 == 'rating':
                    posters = MoviePoster.objects.all().order_by('-movie__rating')
                else:
                    posters = MoviePoster.objects.all().order_by('-movie__title')

            else:

                posters = MoviePoster.objects.all().order_by('movie__title')
    else:
        posters = MoviePoster.objects.all()
    

    # for pagination
    page = request.GET.get('page')
    results = 36
    paginator = Paginator(posters, results)

    try:
        posters = paginator.page(page)
    except PageNotAnInteger:
        page = 1
        posters = paginator.page(page)
    except EmptyPage:
        page = paginator.num_pages
        posters = paginator.page(page)

    leftIndex = int(page)-3

    if leftIndex < 1:
        leftIndex = 1
    

    rightIndex = int(page)+4

    if rightIndex > paginator.num_pages:
        rightIndex = paginator.num_pages + 1

    custom_range = range(leftIndex, rightIndex)
        
    
    context = {
        'posters' : posters,
        'paginator' : paginator,
        'custom_range' : custom_range,
        'genres': genres,
        'sort1': sort1,
        'sort2': sort2
    }

    return render(request, 'movies.html', context)


def tvShows(request):
    return render(request, 'tv-shows.html')


def search(request):
    query = ''
    if request.GET.get('query'):
        query = request.GET.get('query').split()

    for q in query:
        genre = MovieGenre.objects.filter(genre__label__iexact = q)
   
        
    genre_list = []
    for g in genre:
        genre_list.append(g.movie.slug)

    for q in query:
        if q == query[0]:
            posters = MoviePoster.objects.distinct().filter(Q(movie__title__icontains = q)
            | Q(movie__slug__in = genre_list))
        else: 
            posters.filter(movie__title__icontains = q)

    # for pagination
    page = request.GET.get('page')
    results = 36
    paginator = Paginator(posters, results)

    try:
        posters = paginator.page(page)
    except PageNotAnInteger:
        page = 1
        posters = paginator.page(page)
    except EmptyPage:
        page = paginator.num_pages
        posters = paginator.page(page)

    leftIndex = int(page)-3

    if leftIndex < 1:
        leftIndex = 1
    

    rightIndex = int(page)+4

    if rightIndex > paginator.num_pages:
        rightIndex = paginator.num_pages + 1


    custom_range = range(leftIndex, rightIndex)


    context = {
        'posters' : posters,
        'query' : ' '.join(query),
        'paginator' : paginator,
        'custom_range' : custom_range,
    }

    return render(request, 'search.html', context)


@login_required(login_url='user:login') # check login status
def player(request, slug):

    if Movie.objects.filter(slug = slug).exists():
        poster = MoviePoster.objects.get(movie__slug = slug)
        genre = MovieGenre.objects.filter(movie__slug = slug)
        l = []
        for g in genre:
            l.append(g.genre.label)
        if len(l)>3: genre = ' | '.join(l[:3])
        else: genre = ' | '.join(l)
        
        list = Watchlist.objects.filter(user = request.user)
        watchlist = False
        for watch in list:
            if watch.slug == slug:
                watchlist = True
                break
            else: watchlist = False

        if len(l)>=2:
            more_like_this = MovieGenre.objects.filter(Q(genre__label=l[0]) | Q(genre__label=l[1]))[:48]
        elif len(l) == 1:
            more_like_this = MovieGenre.objects.filter(genre__label=l[0])[:48]
        else:
            more_like_this = MoviePoster.objects.all()[:48]

        moreLikeThis = []
        for mlk in more_like_this:
            moreLikeThis.append(MoviePoster.objects.get(movie__slug = mlk.movie.slug))

        plan = 'Null'
        if Subscription.objects.filter(user = request.user).exists():
            subscriptionUser = Subscription.objects.get(user = request.user)
            plan = subscriptionUser.plan

        rating = 0
        movieId = Movie.objects.get(slug = slug).id
        if UserRating.objects.filter(user = request.user, movie = movieId).exists():
            rating = UserRating.objects.get(user = request.user, movie = movieId).rating

        context = {
            'poster': poster,
            'type': 'Movies',
            'genre': genre,
            'watchlist' : watchlist,
            'moreLikeThis' : moreLikeThis,
            'plan' : str(plan),
            'rating' : rating
        }

    return render(request, 'player.html', context)

# response status
def pageNotFound(request, *args, **argv):
    return render(request, '404.html', status=404)

def serverError(request, *args, **argv):
    return render(request, '500.html', status=500)

def permissionDenied(request, *args, **argv):
    return render(request, '403.html', status=403)

def badRequest(request, *args, **argv):
    return render(request, '400.html', status=400)