import json
from django.http import Http404
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import redirect, render
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.decorators import login_required
from .models import Plan, Subscription

import stripe
stripe.api_key = "sk_test_51Ks0jRCzX1BKhEVgrT6Tf7Z4eA3TyKrORgZWlIruIYMzW99CbOEJttUzKgNpwmgx2ABFmHTj8hwBeJlwtVJXroNI00AExA6O0q"

# Create your views here.

# find out if the user is subscribed or not
def isSubscribed(request):
    if Subscription.objects.filter(user = request.user).exists():
            subscriptionUser = Subscription.objects.get(user = request.user)
            plan = subscriptionUser.plan
    return True if str(plan) != 'Null' else False


def plans(request):
    if isSubscribed(request): return redirect('user:profile')
    return render(request, 'plans.html')  


@login_required(login_url='user:login')
def subscription(request, plan):
    if isSubscribed(request): return redirect('user:profile')
    else:
        if plan == 'regular' or 'standard' or 'premium':
            if plan == 'regular': price = 5.99
            elif plan == 'standard': price = 11.99
            elif plan == 'premium': price = 19.99

            context = {
                    'priceId': Plan.objects.get(label=plan).price_id,
                    'plan': plan,
                    'price': price,
                }            

            return render(request, 'subscription.html', context)

        else: raise Http404 # apart from the palns


def success(request):
    return render(request, 'congratulations.html')


@csrf_exempt
@login_required
def createSubscription(request):
    if request.method=="POST":
        data = json.loads(request.body)
        try:
            # attach the payment method to the customer
            stripe.PaymentMethod.attach(
                data['paymentMethodId'],
                customer=request.user.subscription.stripe_customer,
            )
            # set the default payment method on the customer
            stripe.Customer.modify(
                request.user.subscription.stripe_customer,
                invoice_settings={
                    'default_payment_method': data['paymentMethodId'],
                },
            )

            # create the subscription
            subscription = stripe.Subscription.create(
                customer=request.user.subscription.stripe_customer,
                items=[
                    {
                        'price': data['priceId']
                    }
                ],
                expand=['latest_invoice.payment_intent'],
            )

            # update the local subscription models
            user_subscription = Subscription.objects.get(user=request.user)
            try:
                user_subscription.stripe_subscription = subscription.id
                user_subscription.plan = Plan.objects.get(price_id = data['priceId'])
                user_subscription.active = True
                user_subscription.save()

            except ObjectDoesNotExist :
                print("could not find user object")

            return JsonResponse(subscription)

        except Exception as e:
            print(str(e))
            return JsonResponse({'message': str(e)}, status=200)
