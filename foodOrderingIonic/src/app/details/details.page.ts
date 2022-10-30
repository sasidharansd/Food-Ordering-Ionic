/* eslint-disable @typescript-eslint/quotes */
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, QueryList, ViewChild } from '@angular/core';
import { IonContent, IonList, IonSlides, isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, AfterViewInit {
  @ViewChild(IonList, {read: ElementRef, static: true}) lists: QueryList<ElementRef>;
  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonSlides) slides: IonSlides;
  listElements = [];
  activeCategory = 0;
  public data = null;
  opts = {
    freeMode: true,
    slidesPerView: 2.6,
    slidesOffsetBefore: 30,
    slidesOffsetAfter: 100
  };
  categorySlidesVisible = true;
  constructor(private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
    ) { }

  ngOnInit() {
    this.http.get<any>('https://devdactic.fra1.digitaloceanspaces.com/foodui/1.json').subscribe(res =>{
        this.data = res;
        console.log('🚀 ~ file: details.page.ts ~ line 16 ~ DetailsPage ~ ngOnInit ~ res', res);
    });
    const headerHeight = isPlatform('ios') ? 44: 56;
    this.document.documentElement.style.setProperty('--header-position',`calc(env(safe-area-inset-top)+ ${headerHeight}px)`);
  }

  ngAfterViewInit(): void {
    console.log('afterviewInit');
    this.lists?.changes.subscribe(
      results => {
        this.listElements = this.lists?.toArray();
        console.log("🚀 ~ file: details.page.ts ~ line 45 ~ DetailsPage ~ ngAfterViewInit ~  this.listElements",  this.listElements);
    },
    error => {
      console.log(error);
    }
    );
  }


  selectCategory(index){
    this.activeCategory = index;
    const child = this.listElements[index].nativeElement;
    this.content.scrollToPoint(0, child.offsetTop -120,1000);

  }


  public onScroll(event: any){
    console.log("🚀 ~ file: details.page.ts ~ line 43 ~ DetailsPage ~ onScroll ~ offset");
    const offset = event.detail.scrollTop;
    this.categorySlidesVisible = offset > 500;

    for(let i=0; i<this.listElements.length; i++){
      const item = this.listElements[i].nativeElement;
      if(this.isElementViewport(item)){
        this.activeCategory=i;
        this.slides.slideTo(i, 1000);
        break;
      }
    }
  }

  isElementViewport(el){
    const rect = el.getBoundingClientRect();

    return (
      rect.top >=0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }
}
