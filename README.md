# Hackatum 2022 - ReFlow
More efficient charging

## Inspiration
We felt motivated to participate in the callenge by Sixt. Electrification of cars will definitly be one important factor in the future in order to make transportation more environmentally friendly. Also we all like to automate and improve processes and thats why Sixt's challenge was specifically interesting for us. Together as a team we build ReFlow.

## What it does
ReFlow is a webapplication that **supports Sixt stations** in improving following processes:

1) __registration of vehicles__ (fast checking via QR-Codes)

2) __organistation of tasks__ (notification about upcoming tasks and planning of tasks)

3) make the car charging process more efficient due to __better scheduling__ of car charging times (scheduling all cars at the station to multiple wallbocks with potentially different charging speeds to make upcoming rentals possible)

We assumed that at every Sixt station there will be charging stations over time and it will be in their interest to use those in the most efficient way. Its unlikely that every rental car can be returned fully charged, especially business customers sometimes can't wait 30min or more until the car is fully charged. Therefore Sixt will continue to need solutions to cope with the charging challenge directly at their stations. Thats the point where ReFlow comes to play and will schedule the charging times of cars and generally supports the station in managing this Sixt service.

## How we built it
We build a Spring Boot Application with a MySQL Database that interacts via REST with a webapplication. Our webapplication can be used on desktop and mobile devices, which allows stationary usages as well as mobile connection to the system. The system is designed to work very easy and intuitive:

1) start by scaning a QR code of an incoming car
2) the car gets automatically scheduled by our system, considering the next rentals, the current battery capacity and the ressources given at the station
3) our systems displays tasks and notifications for the persons working at the station, about changing the currently charging car with a new one based on the calculated schedule

## Challenges we ran into
Not implementing even more functionality

## Accomplishments that we're proud of
We are very proud about our UI design and the intuitive and easy to use functionality.

## What we learned
We learned a lot about working as a team on a tight schedule and formalizing our ideas and models.

## What's next for ReFlow
We have a lot of cool new features we would want to implement in the future.

Potential features:
improving the scheduling algorithm
- considering elctricity prices in our scheduling
- considering user profiles in out scheduling

improving the registration
- use license plate scaning instead of QR-codes
  ...
 