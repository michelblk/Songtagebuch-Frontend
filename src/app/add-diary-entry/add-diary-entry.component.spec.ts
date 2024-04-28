import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiaryEntryComponent } from './add-diary-entry.component';

describe('AddDiaryEntryComponent', () => {
  let component: AddDiaryEntryComponent;
  let fixture: ComponentFixture<AddDiaryEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDiaryEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDiaryEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
