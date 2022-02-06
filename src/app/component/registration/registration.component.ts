import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  currentTab = 0;
  ahmad = true;
  constructor() {}

  ngOnInit(): void {
    this.showTab(this.currentTab);
  }

  showTab(n) {
    var x = document.getElementsByClassName('tab');
    // x[n].style.display = 'block';
    if (n == 0) {
      this.ahmad = true;
    } else {
      this.ahmad = false;
    }
    if (n == 0) {
      document.getElementById('prevBtn')!.style.display = 'none';
    } else {
      document.getElementById('prevBtn')!.style.display = 'inline';
    }
    if (n == x.length - 1) {
      document.getElementById('nextBtn')!.innerHTML = 'Submit';
    } else {
      document.getElementById('nextBtn')!.innerHTML = 'Next';
    }
    this.scrollToTop();

    this.fixStepIndicator(n);
  }

  nextPrev(n) {
    if (this.validateForm()) {
      if (n == 1) {
        this.ahmad = false;
      } else {
        this.ahmad = true;
      }
      this.currentTab = this.currentTab + n;
    }
    this.scrollToTop();
    this.showTab(this.currentTab);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  validateForm() {
    var x,
      y,
      i,
      valid = true;
    x = document.getElementsByClassName('tab');
    y = x[this.currentTab].getElementsByTagName('input');

    for (i = 0; i < y.length; i++) {
      if (y[i].value == '') {
        y[i].className += ' invalid';

        valid = false;
      }
    }

    if (valid) {
      document.getElementsByClassName('step')[this.currentTab].className +=
        ' finish';
    }
    return valid;
  }

  fixStepIndicator(n) {
    var i,
      x = document.getElementsByClassName('step');
    for (i = 0; i < x.length; i++) {
      x[i].className = x[i].className.replace(' active', '');
    }

    x[n].className += ' active';
  }
}
