#FROM mcr.microsoft.com/mssql/server:2022-latest
FROM mcr.microsoft.com/mssql/server:2017-latest
ENV ACCEPT_EULA=Y
ENV MSSQL_SA_PASSWORD=myVeryStrongPassword99!
WORKDIR /config
COPY . .
