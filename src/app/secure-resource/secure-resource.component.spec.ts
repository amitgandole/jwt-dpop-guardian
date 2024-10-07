import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureResourceComponent } from './secure-resource.component';

describe('SecureResourceComponent', () => {
  let component: SecureResourceComponent;
  let fixture: ComponentFixture<SecureResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecureResourceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecureResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
