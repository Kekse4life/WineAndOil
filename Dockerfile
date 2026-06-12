FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
COPY WebShopBackend/ ./
RUN dotnet publish WebshopBackend.csproj -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./
EXPOSE 8080
ENV ASPNETCORE_URLS=http://0.0.0.0:8080
ENTRYPOINT ["dotnet", "WebshopBackend.dll"]