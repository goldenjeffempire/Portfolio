from rest_framework import serializers
from .models import Profile, Skill, Experience, Project, Education, ContactMessage

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class EducationSerializer(serializers.ModelSerializer):
    graduation_year = serializers.SerializerMethodField()

    class Meta:
        model = Education
        fields = '__all__'

    def get_graduation_year(self, obj):
        return obj.end_date.year if obj.end_date else None

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']

    def create(self, validated_data):
        return ContactMessage.objects.create(**validated_data)
