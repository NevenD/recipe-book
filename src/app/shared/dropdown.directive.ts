import { ElementRef } from '@angular/core';
import { Directive, HostBinding, HostListener } from '@angular/core';

// directive for bootstrap 4
// stackoverflow.com/questions/41317473/bootstrap-4-in-angular-2-dropdown-not-working
@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  private isOpen: boolean = false;
  constructor(private el: ElementRef) {}

  @HostBinding('class.show') get opened(): boolean {
    return this.isOpen;
  }
  @HostListener('click') open(): void {
    this.isOpen = true;
    this.el.nativeElement.querySelector('.dropdown-menu').classList.add('show');
  }
  @HostListener('document:click', ['$event.target']) close(
    targetElement
  ): void {
    const inside: boolean = this.el.nativeElement.contains(targetElement);
    if (!inside) {
      this.isOpen = false;
      this.el.nativeElement
        .querySelector('.dropdown-menu')
        .classList.remove('show');
    }
  }
}
