import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { API_CONFIG } from '../../config/api.config';
import { CategoriaDTO } from '../../models/categoria.dto';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  items: CategoriaDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaService: CategoriaService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }
  
  loadData(){
    let loader = this.presentLoading();
    this.categoriaService.findAll()
      .subscribe(response => {
        this.items = response;
        loader.dismiss();
      },
      error => {
        loader.dismiss();
      });
  }

  showProdutos(categoria_id: string){
    this.navCtrl.push('ProdutosPage', {categoria_id: categoria_id});
  }

  presentLoading(){
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  doRefresh(refresher){
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

}
