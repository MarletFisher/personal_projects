import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaptersListComponent } from './chapters-list.component';

describe('ChaptersListComponent', () => {
  let component: ChaptersListComponent;
  let fixture: ComponentFixture<ChaptersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChaptersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChaptersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
