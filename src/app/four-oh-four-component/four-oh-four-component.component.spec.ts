import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FourOhFourComponentComponent } from './four-oh-four-component.component';

describe('FourOhFourComponentComponent', () => {
  let component: FourOhFourComponentComponent;
  let fixture: ComponentFixture<FourOhFourComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourOhFourComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourOhFourComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
