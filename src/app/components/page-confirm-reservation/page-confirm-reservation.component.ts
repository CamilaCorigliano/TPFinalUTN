import { Component } from '@angular/core';
import { userService } from 'src/app/services/api.service/userService';
import { ReservationService } from 'src/app/services/reservation.service/reservation.service';
import { RestaurantService } from 'src/app/services/restaurant.service/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TableService } from 'src/app/services/table.service/table.service';

@Component({
  selector: 'app-page-confirm-reservation',
  templateUrl: './page-confirm-reservation.component.html',
  styleUrls: ['./page-confirm-reservation.component.css'],
})
export class PageConfirmReservationComponent {
  userRestaurant!: any;
  tablesReserved!: any[];
  reservation!: any;
  tables!: any[];
  availableTables!: any[];
  reservationId!:any;

  confirmationForm = new FormGroup({
    table: new FormControl([] as any[], Validators.required),
  });
  

  constructor(
    private userService: userService,
    private restaurantService: RestaurantService,
    private reservationService: ReservationService,
    private route: ActivatedRoute,
    private tableServise: TableService
  ) {}
  get tableControl() {
    return this.confirmationForm.get('table') as FormControl;
  }

  ngOnInit() {
    if (this.userService.user && this.restaurantService.restaurants) {
      this.userRestaurant = this.restaurantService.restaurants.find(
        (restaurant) => restaurant.manager_id === this.userService.user._id
      );
    }

    this.route.params.subscribe((params) => {
       this.reservationId = params['id'];
      this.reservationService.getById(this.reservationId).subscribe(
        (data) => {
          this.reservation = data;
          this.reservationService
            .getTablesByDate(this.userRestaurant.id, this.reservation.due_date)
            .subscribe(
              (data) => {
                this.tablesReserved = data;
                this.tableServise.getTables(this.userRestaurant.id).subscribe(
                  (data) => {
                    this.tables = data;
                    if (this.tablesReserved.length > 0) {
                      this.tables.forEach((table) => {
                        this.tablesReserved.forEach((tableReserved) => {
                          if (table.number != tableReserved.table_number) {
                            this.tables.push(table.number);
                          }
                        });
                      });
                    } else {
                      this.availableTables = this.tables;
                    }
                  },
                  (error) => {
                    console.log(error);
                  }
                );
              },
              (error) => {
                console.log(error);
              }
            );
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  onSubmit() {
    if (this.confirmationForm?.valid) {
      const tableControl = this.confirmationForm.get('table');
  
      console.log('tableControl:', tableControl?.value);
  
      if (tableControl instanceof FormControl && Array.isArray(tableControl.value)) {
        let selectedTables: number[] = tableControl.value;

        console.log('selectedTables:', selectedTables);
        console.log(this.reservationId);
        if (selectedTables.length > 0) {
          this.reservationService
            .confirmReservation(this.userRestaurant.id, this.reservationId, 'confirmed', selectedTables)
            .subscribe(
              (data) => {
                alert('Reserva confirmada con éxito');
              },
              (error) => {
                console.error('Error al confirmar la reserva:', error.message);
                alert('Error al confirmar la reserva. Consulta la consola para más detalles.');
              }
            );
        } else {
          alert('Selecciona al menos una mesa antes de confirmar la reserva.');
        }
      }
    }
  }
  
  
}

