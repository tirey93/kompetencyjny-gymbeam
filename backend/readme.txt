1. In order to migrate db do the following step in your kompetencyjny-gymbeam\backend folder:
dotnet tool install --global dotnet-ef --version 7.0.17
dotnet ef database update --project Infrastructure --startup-project GymBeam

2. After that in order to update to current db version you need to run:
dotnet ef database update --project Infrastructure --startup-project GymBeam

djwbandss