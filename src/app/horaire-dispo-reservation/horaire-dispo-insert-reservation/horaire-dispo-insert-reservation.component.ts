import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horaire-dispo-insert-reservation',
  templateUrl: './horaire-dispo-insert-reservation.component.html',
  styleUrls: ['./horaire-dispo-insert-reservation.component.css']
})
export class HoraireDispoInsertReservationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  async insertHoraireReservation() { 

    console.log('Click on insertHoraireReservation()');
    /*const result = await this.reservationService.createReservation(
      this.reservationForm.value.name,
      this.reservationForm.value.type,
      this.reservationForm.value.employe,
      this.reservationForm.value.date,
      this.reservationForm.value.heure,
      this.user.uid
      
     
    );

    console.log('result', result);
    
    await Toast.show({ //si problème -> Stackoverflow 
      text: 'Insertion effectué avec succès!'
    });

    this.reservationForm.reset();
    this.router.navigate(['/personalreservation']);*/  
  }

}
