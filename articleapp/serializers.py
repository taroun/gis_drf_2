from rest_framework.serializers import ModelSerializer

from articleapp.models import Article


class ArticleSerializer(ModelSerializer):
    class Meta:
        model = Article
        field = ['title', 'image', 'content']

