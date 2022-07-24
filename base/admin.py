from django.contrib import admin
from .models import *

# Register your models here.

# for inline purpose
class InlineMovieGenre(admin.TabularInline):
     autocomplete_fields = ['genre']
     extra = 1
     model = MovieGenre


class InlineMovieCredit(admin.TabularInline):
    autocomplete_fields = ['person', 'department']
    extra = 1
    model = MovieCredit


class InlineMoviePoster(admin.TabularInline):
    extra = 1
    model = MoviePoster


class InlineMovieBanner(admin.TabularInline):
    extra = 1
    model = MovieBanner


class InlineTVShowGenre(admin.TabularInline):
     autocomplete_fields = ['genre']
     extra = 1
     model = TVShowGenre


class InlineTVShowCredit(admin.TabularInline):
    autocomplete_fields = ['person', 'department']
    extra = 1
    model = TVShowCredit


class InlineSeasonAndEpisode(admin.TabularInline):
    autocomplete_fields = ['episode']
    extra = 1
    model = SeasonAndEpisode

    
class InlineTVShowPoster(admin.TabularInline):
    extra = 1
    model = TVShowPoster


class InlineTVShowBanner(admin.TabularInline):
    extra = 1
    model = TVShowBanner


# normla registration
admin.site.register(MovieCredit)
#admin.site.register(MovieGenre)
admin.site.register(SeasonAndEpisode)


# specify the search field and call the inline classes
@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    search_fields = ['name']

@admin.register(Movie)
class MovieAdmin(admin.ModelAdmin):
    inlines = [InlineMovieGenre, InlineMovieCredit, InlineMoviePoster, InlineMovieBanner]
    list_per_page = 10
    search_fields = ['title__istartswith','moviegenre__genre__label']
    
@admin.register(TVShow)
class MovieAdmin(admin.ModelAdmin):
    inlines = [InlineTVShowGenre, InlineTVShowCredit, InlineSeasonAndEpisode, InlineTVShowPoster, InlineTVShowBanner]
    list_per_page = 10
    search_fields = ['title__istartswith']

@admin.register(Episode)
class MovieAdmin(admin.ModelAdmin):
    list_per_page = 10
    search_fields = ['season__istartswith']

@admin.register(Genre)
class MovieAdmin(admin.ModelAdmin):
    list_per_page = 10
    search_fields = ['label__istartswith']

@admin.register(MovieGenre)
class MovieAdmin(admin.ModelAdmin):
    list_per_page = 10
    search_fields = ['genre__label']

@admin.register(Person)
class MovieAdmin(admin.ModelAdmin):
    list_per_page = 10
    search_fields = ['name__istartswith']

@admin.register(MoviePoster)
class MovieAdmin(admin.ModelAdmin):
    list_per_page = 10
    search_fields = ['movie__title__istartswith', 'movie__moviegenre__genre__label']

@admin.register(MovieBanner)
class MovieAdmin(admin.ModelAdmin):
    list_per_page = 10
    search_fields = ['movie__title__istartswith']

@admin.register(TVShowPoster)
class MovieAdmin(admin.ModelAdmin):
    list_per_page = 10
    search_fields = ['tvshow__istartswith']

@admin.register(TVShowBanner)
class MovieAdmin(admin.ModelAdmin):
    list_per_page = 10
    search_fields = ['tvshow__istartswith']
