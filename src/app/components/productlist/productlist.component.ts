import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons,NgbDatepickerModule ,NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { product } from 'src/app/dto/Product';
import { ApiProductService } from 'src/app/services/product/api-product.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit{
  data$:any;
  closeResult = '';

  name: string="";
  description: string="";
  quantity: number=0;
  
  updateobject:product={
    id:'',
    name:'',
    description:'',
    quantity:''
  }

  newproduct?: product;
  constructor(private _productapi:ApiProductService,private modalService: NgbModal){}

  ngOnInit(): void {
    this.getallproducts();

    
  }
  
  getallproducts(){
    this._productapi.getproducts().subscribe(value=>{
      this.data$=value;
      console.log(this.data$)
    });
  }
  deleteproduct(id:any){
    this._productapi.deleteproduct(id).subscribe(response=>{
      console.log(response)
      this.getallproducts();
    });
  }
  updateproduct(id:any,product:product){
    this._productapi.updateproduct(product).subscribe(Response=>{
      console.log(Response);
      this.getallproducts();
    })
  }

  onSubmit() {
    console.log('Form submitted!');    
    this.oncreateproduct();
    this.getallproducts();
  }
  oncreateproduct(){
   // const data= {"brand":this.brand,"category":this.category,"title":this.title,"price":this.price,"description":"this is disc","discountPercentage":"10","rating":"5","stock":"12","thumbnail":"!23","images":["12","!23"]};
    let productff: product=new product(0,this.name,this.description,this.quantity);
  
    this._productapi.addproduct(productff).subscribe(response=>{
      console.log(response);
    })
    
  /*  this._productapi.addproduct(JSON.stringify(data)).subscribe(res => {
      console.log(res)
      })*/
  }
  onSubmitupdate() {
    console.log('Form submitted!');    
    this.onproductupdate();
    this.getallproducts();
  }
  onproductupdate(){
   // const data= {"brand":this.brand,"category":this.category,"title":this.title,"price":this.price,"description":"this is disc","discountPercentage":"10","rating":"5","stock":"12","thumbnail":"!23","images":["12","!23"]};
    
  
    this._productapi.updateproduct(this.updateobject).subscribe(response=>{
      console.log(response);
    })
    
  /*  this._productapi.addproduct(JSON.stringify(data)).subscribe(res => {
      console.log(res)
      })*/
  }









// below methods for opening modals
  open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}
  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}

  openupdatemodal(id:any,name:any,description:any,quantity:any,content: any) {
    this.updateobject.id=id;

    this.updateobject.name=name;

    this.updateobject.description=description;

    this.updateobject.quantity=quantity;

		this.modalService.open(content, { ariaLabelledBy: 'update-modal' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReasonupdate(reason)}`;
			},
		);
	}
  private getDismissReasonupdate(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}
  
}
