from logging import exception
from django.db.models import Case, When
import pandas as pd

from user.models import UserRating
from .models import Movie, MoviePoster


# to get similar movies based on user rating
def get_similar(movie_name,rating,corrMatrix):
    similar_ratings = corrMatrix[movie_name]*(rating-2.5)
    similar_ratings = similar_ratings.sort_values(ascending=False)
    return similar_ratings


# recommendation algorithm
def recommend(request):

    if request.user.is_authenticated:
        movie_rating=pd.DataFrame(list(UserRating.objects.all().values()))

        if not UserRating.objects.filter(user = request.user).exists():
            movie=Movie.objects.get(id=19)
            q=UserRating(
                user=request.user,
                type='Movies',
                movie=movie,
                rating=0
                )
            q.save()

        userRatings = movie_rating.pivot_table(index=['user_id'],columns=['movie_id'],values='rating')
        userRatings = userRatings.fillna(0,axis=1)
        corrMatrix = userRatings.corr(method='pearson')

        user = pd.DataFrame(list(UserRating.objects.filter(user=request.user).values())).drop(['user_id','id'],axis=1)
        user_filtered = [tuple(x) for x in user.values]
        movie_id_watched = [each[0] for each in user_filtered]

        similar_movies = pd.DataFrame(get_similar(movie,rating,corrMatrix) for type,movie,rating in user_filtered)
        # for type,movie,rating in user_filtered:
        #     similar_movies = similar_movies.append(get_similar(movie,rating,corrMatrix),ignore_index = True)

        movies_id = list(similar_movies.sum().sort_values(ascending=False).index)
        movies_id_recommend = [each for each in movies_id if each not in movie_id_watched]
        preserved = Case(*[When(pk=pk, then=pos) for pos, pk in enumerate(movies_id_recommend)])
        movie_list=list(MoviePoster.objects.filter(movie__id__in = movies_id_recommend).order_by(preserved)[:60])

    else:
       raise exception('else')

    return movie_list
