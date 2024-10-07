import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-secure-resource',
  templateUrl: './secure-resource.component.html',
})
export class SecureResourceComponent {
  data: any;

  constructor(private apiService: ApiService) {}

  getSecureData() {
    this.apiService.getSecureData().subscribe((response) => {
      this.data = response;
    });
  }
}