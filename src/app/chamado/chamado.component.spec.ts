import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadoComponent } from './chamado.component';

describe('ChamadoComponent', () => {
  let component: ChamadoComponent;
  let fixture: ComponentFixture<ChamadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChamadoComponent]
    });
    fixture = TestBed.createComponent(ChamadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
