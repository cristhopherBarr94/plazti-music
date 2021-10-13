import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBrokenLink]',
})
export class BrokenLinkDirective {
  public defaultImg: string = 'assets/img/404_1x.png';
  constructor(private _el: ElementRef) {}

  @HostListener('error')
  loadDefImage() {
    const image = this._el.nativeElement;
    image.src = this.defaultImg;
    image.srcset = this.defaultImg;
    console.log(this._el.nativeElement);
  }
}
