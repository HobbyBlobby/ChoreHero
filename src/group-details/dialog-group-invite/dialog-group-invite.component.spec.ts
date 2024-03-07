import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogGroupInviteComponent } from './dialog-group-invite.component';

describe('DialogGroupInviteComponent', () => {
  let component: DialogGroupInviteComponent;
  let fixture: ComponentFixture<DialogGroupInviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogGroupInviteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogGroupInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
