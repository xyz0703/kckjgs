import { Component, OnInit } from '@angular/core';
import { MapService } from '../home/map/+service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-address-choice',
  templateUrl: './addressChoice.component.html',
  styleUrls: ['./addressChoice.component.scss']
})
export class AddressChoiceComponent implements OnInit {

  constructor(
    public mapServ: MapService,
    public appServ: AppService,
  ) { }

  public searchValue: string  //搜索值
  public list: Array<any> = []  //地点列表
  public city: string  //地点所在城市
  public collectData: any = {}

  //搜索框监听
  SearchChange(value: string): void {
    value ?
      this.Search(value) : ''
  }

  //搜索提示
  Search(value: string): void {
    const data = {
      city: this.city,
      citylimit: true,
      keywords: value
    }
    this.mapServ.Amap(this.mapServ.assistantInputtipsUrl, data).subscribe((res: any) => {
      this.list = res.tips
    })
  }

  //返回主页
  Home(item: any): void {
    let address: any = item ?
      this.collectData.AddressChoiceType == 'start' ?
        {
          Start: item.name,
          StartLng: item.location.split(',')[0],
          StartLat: item.location.split(',')[1]
        } : {
          Start: item.name,
          StartLng: item.location.split(',')[0],
          StartLat: item.location.split(',')[1]
        } : ''
    this.collectData = Object.assign(this.collectData, address)
    delete this.collectData.AddressChoiceType
    delete this.collectData.City
    this.appServ.Router('home', this.collectData)
  }

  //接收路由参数
  RouterInfo(): void {
    this.appServ.routerInfo.queryParams.subscribe((res: any) => {
      this.collectData = this.appServ.CloneDeep(res)
      res.AddressChoiceType == 'start' ?  //选择起点/终点
        [
          res.City ?  //是否选择城市
            [
              this.collectData.StartCity = res.City,
            ] : '',
          this.city = this.collectData.StartCity,

        ] : [
          res.City ?
            [
              this.collectData.EndCity = res.City,
              this.city = this.collectData.EndCity
            ] : '',
          this.city = this.collectData.EndCity,
        ]
    })
  }
  ngOnInit(): void {
    this.RouterInfo()
  }

}