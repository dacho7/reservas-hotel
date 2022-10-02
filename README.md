# Reservas-hotel
Api para realizar reservaciones en un hotel

En esta api cuenta con las operaciones necesarias para realizar reservaciones de habitaciones de un hotel
NOTA: revisar la documentacion de los endPoints generadas por la aplicacion, en la ruta http:/host:3000/docs, http://localhost:3000/docs

Para este modelo de negocio se creo una base de datos que contiene registros de habitaciones y reservaciones
las habitaciones contienen detalles como descripcion, servicios, y costo y un estado que puede ser Ocupado o Disponible
para asi determinar si un cliente la puede reservar

## EndPoints relacionados con habitaciones son :

### get: host/api/habitaciones               
lista todas las habitaciones se realiza para saber con cuantas habitaciones tiene  un hotel
put: 

### host/api/habitaciones/id            
se puede actualizar los datos de una habitacion en caso de requerir otra descripcion, otros servicios, precio o si la reservo un cliente y ya no esta disponible   

### get: host/api/habitaciones/disponibles   
lista todas las habitaciones disponibles para saber si se puede reservar

### get: host/api/habitaciones/ocupadas
lista todas las habitaciones ocupadas para procesos administrativos

### post: host/api/habitaciones              
permite registrar una nueva habitacion para ser reservadas posteriormente



despues tenemos las reservaciones en las cuales un cliente reserva una habitacion para posteriormente ser ocupada

## EndPoints relacionados con reservaciones son:

### get: host/api/reservas                  
lista todas las reservaciones realizadas en el hotel

### post: host/api/reservas                  
crear una reservacion de un cliente en caso de pagar alguna cantidad inferior al total de la reserva, se realizara el registro con estado Pendiente, y esta habitacion ya no estara disponible para reservar

### get: host/api/reservas/id                 
permite ver los datos de una reserva conveniente para el hotel y saber cual cliente reservo la habitacion o si se realizo el pago

### put: host/api/reservas/id               
permite actualizar los datos de una reserva como puede ser el cliente, cambiar la habitacion para reservar el tipo de pago o el monto, y en caso de abonar el valor total a la reserva quedara en estado Pagado
