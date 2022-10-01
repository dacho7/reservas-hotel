# Reservas-hotel
Api para realizar reservaciones en un hotel

En esta api cuenta con las operaciones necesarias para realizar reservaciones de habitaciones de un hotel

Para este modelo de negocio se creo una base de datos que contiene registros de habitaciones y reservaciones
las habitaciones contienen detalles como descripcion, servicios, y costo y un estado que puede ser Ocupado o Disponible
para asi determinar si un cliente la puede reservar

para poder listar las habitaciones disponibles podemos acceder a los siguentes endPoints

get: host/api/habitaciones               lista todas las habitaciones se realiza para saber con cuantas habitaciones tiene  un hotel
get: host/api/habitaciones/disponibles   lista todas las habitaciones disponibles para saber si se puede reservar
get: host/api/habitaciones/ocupadas      lista todas las habitaciones ocupadas para procesos administrativos
post: host/api/habitaciones              permite registrar una nueva habitacion para ser reservadas posteriormente




