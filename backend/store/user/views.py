from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import SAFE_METHODS
from rest_framework.permissions import IsAuthenticated

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from user.models import EmailVerification, EmailPasswordReset
from user.permissions import IsOwnerOrReadOnly
from user.serializers import UserModel, UserSerializer, UserCreateSerializer, UserUpdateSerializer, \
    PasswordChangeRequestSerializer, PasswordResetSerializer
from user.tasks import send_password_change


class UserListAPIView(ListCreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.request.method != "POST":
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return UserSerializer
        return UserCreateSerializer


class UserDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
    lookup_field = "id"
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    def get_serializer_class(self):
        if self.request.method in SAFE_METHODS:
            return UserSerializer
        return UserUpdateSerializer

    def perform_update(self, serializer):
        if 'password' in serializer.validated_data:
            user = self.get_object()
            user.set_password(serializer.validated_data['password'])
            user.save()
        else:
            serializer.save()


class EmailVerificationView(APIView):
    def get(self, request, email, code):
        try:
            verification = EmailVerification.objects.get(user__email=email, code=code)
            if not verification.is_expired():
                verification.user.is_verified_email = True
                verification.user.save()
                verification.delete()
                return Response({'message': 'Your account has been verified successfully.'}, status=status.HTTP_200_OK)
            else:
                verification.delete()
                return Response({'error': 'Verification link has expired.'}, status=status.HTTP_400_BAD_REQUEST)
        except EmailVerification.DoesNotExist:
            return Response({'error': 'Invalid verification link.'}, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetView(APIView):
    def post(self, request, email, code):
        serializer = PasswordResetSerializer(data=request.data)
        if serializer.is_valid():
            try:
                pc_record = EmailPasswordReset.objects.get(user__email=email, code=code)
                user = UserModel.objects.get(email=email)
                if not pc_record.is_expired():
                    user.set_password(serializer.validated_data['password'])
                    user.save()
                    pc_record.delete()
                    return Response({'message': 'Your password has been changed successfully.'}, status=status.HTTP_200_OK)
                else:
                    pc_record.delete()
                    return Response({'error': 'This link has expired.'}, status=status.HTTP_400_BAD_REQUEST)
            except EmailPasswordReset.DoesNotExist:
                return Response({'error': 'Invalid link.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"detail": "Invalid input. Please provide the correct data."},
                            status=status.HTTP_400_BAD_REQUEST)


class PasswordChangeRequestView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = PasswordChangeRequestSerializer(data=request.data)

        if serializer.is_valid():
            user = UserModel.objects.get(email=serializer.validated_data['email'])
            send_password_change.delay(user_id=user.id)
            return Response({"detail": "An email has been sent to your email address with further instructions"},
                            status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Invalid input. Please provide the correct data."},
                            status=status.HTTP_400_BAD_REQUEST)
