import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResetContrasenaPage } from './reset-contrasena.page';

describe('ResetContrasenaPage', () => {
  let component: ResetContrasenaPage;
  let fixture: ComponentFixture<ResetContrasenaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ResetContrasenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
