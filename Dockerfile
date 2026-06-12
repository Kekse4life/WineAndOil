FROM mcr.microsoft.com/dotnet/sdk:8.0
WORKDIR /app
COPY WebShopBackend/ ./
RUN dotnet publish WebshopBackend.csproj -c Release -o out
EXPOSE 8080
ENV ASPNETCORE_URLS=http://0.0.0.0:8080
CMD ["dotnet", "/app/out/WebshopBackend.dll"]