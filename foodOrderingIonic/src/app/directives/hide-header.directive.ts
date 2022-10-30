import { AfterViewInit, Directive, HostListener, Input, Renderer2 } from '@angular/core';
import { DomController, isPlatform } from '@ionic/angular';

@Directive({
  selector: '[appHideHeader]'
})
export class HideHeaderDirective implements AfterViewInit {
  @Input('appHideHeader') header: any;
  private headerHeight = isPlatform('ios')? 44:56;
  private children: any;
  private showLocationDetail: boolean;

  constructor(
    private renderer: Renderer2,
    private domCtrl: DomController
  ) { }

  @HostListener('ionScroll',['$event']) onContentScroll($event: any){
    const scrollTop: number = $event.detail.scrollTop;
    let newPosition = -scrollTop;
    if(newPosition < -this.headerHeight){
      newPosition = -this.headerHeight;
    }
    const newOpacity = 1 - (newPosition /-this.headerHeight);

    this.domCtrl.write(() =>{
      this.renderer.setStyle(this.header,'top',newPosition + 'px');

      for(const child of this.children){
        this.renderer.setStyle(child,'opacity',newOpacity);
      }
    });
  }

  ngAfterViewInit(): void {
      this.header = this.header.el;
      this.children = this.header.children;
  }


  onScroll(event){
    const offset = event.detail.top;
    this.showLocationDetail = offset > 50;
  }

}
