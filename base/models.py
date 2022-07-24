import os
from django.db import models
from django.core.validators import *

from django.utils.text import slugify

# Create your models here.

class Genre(models.Model):
    label = models.CharField(max_length=255)

    class Meta:
        ordering = ['label']
        verbose_name_plural = 'Genres'

    def __str__(self):
        return self.label


class Department(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        ordering = ['name']
        verbose_name_plural = 'Departments'

    def __str__(self):
        return self.name


class Person(models.Model):
    name = models.CharField(max_length=255)

    class Meta:
        ordering = ['name']
        verbose_name_plural = 'People'

    def __str__(self):
        return self.name


class Movie(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, null = True, blank = True)
    tagline = models.CharField(max_length=510, blank=True, null= True)
    storyline = models.TextField()
    runtime = models.PositiveIntegerField()
    rating = models.FloatField(validators= [MinValueValidator(0.0),MaxValueValidator(10.0)])
    release_date = models.DateField()

    class Meta:
        ordering = ['title']
        verbose_name_plural = 'Movies'

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        value = "%s-%s" % (self.title, self.release_date.strftime('%Y'))
        self.slug = slugify(value, allow_unicode=True)
        super().save(*args, **kwargs)

    def year(self):
        year = self.release_date.strftime('%Y')
        return str(year)


class MovieGenre(models.Model):
    movie = models.ForeignKey(Movie, on_delete= models.CASCADE)
    genre = models.ForeignKey(Genre, on_delete= models.PROTECT)

    class Meta:
        verbose_name_plural = 'Movie Genres'
    
    def __str__(self):
        return '{} - {}'.format(self.genre.label,self.movie.title)


class MovieCredit(models.Model):
    movie = models.ForeignKey(Movie, on_delete= models.PROTECT)
    department = models.ForeignKey(Department, on_delete= models.PROTECT)
    person = models.ForeignKey(Person, on_delete= models.PROTECT)  
    
    class Meta:
        verbose_name_plural = 'Movie Credits'


class TVShow(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, null = True, blank = True)
    storyline = models.TextField()
    runtime = models.PositiveIntegerField()
    rating = models.FloatField(validators= [MinValueValidator(0.0),MaxValueValidator(10.0)])
    release_date = models.DateField()

    class Meta:
        ordering = ['title']
        verbose_name_plural = 'TV Shows'

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        value = "%s-%s" % (self.title, self.release_date.strftime('%Y'))
        self.slug = slugify(value, allow_unicode=True)
        super().save(*args, **kwargs)


class TVShowGenre(models.Model):
    tvshow = models.ForeignKey(TVShow, on_delete= models.PROTECT)
    genre = models.ForeignKey(Genre, on_delete= models.PROTECT)

    class Meta:
        verbose_name_plural = 'TV Show Genres'


class TVShowCredit(models.Model):
    tvshow = models.ForeignKey(TVShow, on_delete= models.PROTECT)
    department = models.ForeignKey(Department, on_delete= models.PROTECT)
    person = models.ForeignKey(Person, on_delete= models.PROTECT)  
    
    class Meta:
        verbose_name_plural = 'TV Show Credits'


class Episode(models.Model):
    number = models.PositiveIntegerField()
    title = models.CharField(max_length=255)
    storyline = models.TextField()
    rating = models.FloatField(validators= [MinValueValidator(0.0),MaxValueValidator(10.0)])

    class Meta:
        verbose_name_plural = 'Episodes'


class SeasonAndEpisode(models.Model):
    tvshow = models.ForeignKey(TVShow, on_delete= models.CASCADE, related_name= 'tvshow')
    season = models.PositiveIntegerField()
    episode = models.ForeignKey(Episode, on_delete= models.CASCADE, related_name= 'episode')

    class Meta:
        verbose_name_plural = 'Season and Episode'

# function to rename movie posters and banners 
def movie_poster_rename(instance, filename):
    ext = filename.split('.')[-1] # ext = file extension
    filename = '{}.{}'.format(instance.movie.slug, ext)
    return os.path.join('movie/posters', filename)

def movie_banner_rename(instance, filename):
    ext = filename.split('.')[-1] # ext = file extension
    filename = '{}.{}'.format(instance.movie.slug, ext)
    return os.path.join('movie/banners', filename)

def tvshow_poster_rename(instance, filename):
    ext = filename.split('.')[-1] # ext = file extension
    filename = '{}.{}'.format(instance.tvshow.slug, ext)
    return os.path.join('tvshow/posters', filename)

def tvshow_banner_rename(instance, filename):
    ext = filename.split('.')[-1] # ext = file extension
    filename = '{}.{}'.format(instance.tvshow.slug, ext)
    return os.path.join('tvshow/banners', filename)


class MoviePoster(models.Model):
    movie = models.ForeignKey(Movie, on_delete= models.CASCADE, related_name= 'movie_poster')
    poster = models.ImageField(upload_to=movie_poster_rename)

    def __str__(self):
        return self.movie.title

class TVShowPoster(models.Model):
    tvshow = models.ForeignKey(TVShow, on_delete= models.CASCADE, related_name= 'tvshow_poster')
    poster = models.ImageField(upload_to=tvshow_poster_rename)    

    def __str__(self):
        return self.tvshow.title

class MovieBanner(models.Model):
    movie = models.ForeignKey(Movie, on_delete= models.CASCADE, related_name= 'movie_banner')
    banner = models.ImageField(upload_to=movie_banner_rename)    

    def __str__(self):
        return self.movie.title

class TVShowBanner(models.Model):
    tvshow = models.ForeignKey(TVShow, on_delete= models.CASCADE, related_name= 'tvshow_banner')
    banner = models.ImageField(upload_to=tvshow_banner_rename)    

    def __str__(self):
        return self.tvshow.title
