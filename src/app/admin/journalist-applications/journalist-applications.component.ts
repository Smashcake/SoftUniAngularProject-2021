import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IJournalistApplicant } from 'src/app/interfaces/journalist-applicant';
import { UserService } from 'src/app/user/user.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-journalist-applications',
  templateUrl: './journalist-applications.component.html',
  styleUrls: ['./journalist-applications.component.css']
})
export class JournalistApplicationsComponent {

  applicants: IJournalistApplicant[] | undefined;

  constructor(private adminService: AdminService, private userService: UserService, private route: Router) {
    this.applicants = this.getApplicants();
  }

  getApplicants(): IJournalistApplicant[] {
    let journalistApplicants: IJournalistApplicant[] = [];
    this.adminService.journalistApplicants().get().subscribe(collection => {
      collection.docs.map(applicantInfo => {
        let applicant: IJournalistApplicant = {
          name: applicantInfo?.data()?.name,
          surname: applicantInfo?.data()?.surname,
          role: applicantInfo?.data()?.role,
          userId: applicantInfo?.data()?.userId,
          docId: applicantInfo?.data()?.docId
        };
        journalistApplicants.push(applicant);
      })
    })
    return journalistApplicants;
  }

  applicantDecision(verdict: boolean, applicantId: string, docId: string) {
    if (verdict) {
      this.userService.getUserData(applicantId).update({ role: 'journalist'});
    }
    let applicantIndex: number = this.applicants.findIndex(x => x.userId == applicantId);
    if (applicantIndex > -1) {
      this.applicants.splice(applicantIndex, 1);
    }
    this.adminService.journalistApplicants().doc(docId).delete().then((x) => {
      setTimeout(() => this.redirectTo(`journalist-applications`), 200); 
    });
  }

  redirectTo(uri: string) {
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.route.navigate([uri]));
  }
}
