# Reservas-hotel
Api para realizar reservaciones en un hotel

En esta api cuenta con las operaciones necesarias para realizar reservaciones de habitaciones de un hotel
NOTA: revisar la documentacion de los endPoints generadas por la aplicacion, en la ruta http:/host:3000/docs, http://localhost:3000/docs

Para este modelo de negocio se creo una base de datos que contiene registros de habitaciones y reservaciones
las habitaciones contienen detalles como descripcion, servicios, y costo y un estado que puede ser Ocupado o Disponible
para asi determinar si un cliente la puede reservar

## para listar las habitaciones disponibles podemos acceder a los siguentes endPoints:


get: host/api/habitaciones               lista todas las habitaciones se realiza para saber con cuantas habitaciones tiene  un hotel
put: host/api/habitaciones/id            se puede actualizar los datos de una habitacion en caso de requerir otra descripcion, otros servicios, precio o si la reservo un cliente y ya no esta disponible   
get: host/api/habitaciones/disponibles   lista todas las habitaciones disponibles para saber si se puede reservar
get: host/api/habitaciones/ocupadas      lista todas las habitaciones ocupadas para procesos administrativos
post: host/api/habitaciones              permite registrar una nueva habitacion para ser reservadas posteriormente


despues tenemos las reservaciones en las cuales un cliente reserva una habitacion para posteriormente ser ocupada

## los endPoints disponibles relacionados con reservaciones son:

get: host/api/reservas                  lista todas las reservaciones realizadas en el hotel
post: host/api/reservas                  crear una reservacion de un cliente
get: host/api/reservas/id                 permite ver los datos de una reserva conveniente para el hotel y saber cual cliente reservo la habitacion o si se realizo el pago
put: host/api/reservas/id               permite actualizar el estado de una reserva en caso de querer cancelar, o realizar el pago de la habitacion
