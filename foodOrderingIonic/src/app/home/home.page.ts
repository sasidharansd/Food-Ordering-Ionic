import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public categories = [];
  public highlights = [];
  public featured = [];
  public showLocationDetail = true;
  public catSlideOpts = {
    freeMode: true,
    slidesPerView: 3.5,
    slidesOffsetBefore: 11,
    spaceBetween: 10
  };

  public highlightSlideOpts = {
    slidesPerView: 1.05,
    spaceBetween: 10,
    loop: true,
    centeredSlides: true
  };

  public feauredSlideOpts= {
    slidesPerView: 1.2,
    spaceBetween: 10,
    freeMode: true
  };
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('https://devdactic.fra1.digitaloceanspaces.com/foodui/home.json').subscribe(res =>{
     console.log(res);
     console.log(res.categories);
      this.categories = res.categories;
      this.highlights = res.highlights;
      this.featured = res.featured;
    });
  }

  public doRefresh(event){
    setTimeout(()=>{
      event.target.complete();
    },2000);
  }

  public onScroll(event){
    const offset= event.detail.scrollTop;
    this.showLocationDetail = offset > 50;
  }

}
