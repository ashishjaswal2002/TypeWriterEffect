const TypeWriter = function(txtElement,words,wait=3000){
      this.txtElement = txtElement;
      this.words = words;
      this.txt = '';
      this.wordIndex =0;
      this.wait = parseInt(wait,10);
      this.type();
      this.isDeleting = false;
}
//Type Method..
TypeWriter.prototype.type = function(){
    const current = this.wordIndex % this.words.length;
    //Get Full Texy for Current Word
    const fullTxt = this.words[current];
    if(this.isDeleting){
     //Remove char..
     this.txt = fullTxt.substring(0,this.txt.length-1);  
    }else{
        //Addchar..


      this.txt = fullTxt.substring(0,this.txt.length+1);

    }
    //Insert txt into element....
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`; 
   let typeSpeed = 300;
   if(this.isDeleting){
    typeSpeed /=2;
   }
    // If word is Complete.....
   if(!this.isDeleting && this.txt ===fullTxt){
    //Make Pause at end..
    typeSpeed = this.wait;

  this.isDeleting = true;
   }else if(this.isDeleting && this.txt===''){
    this.isDeleting = false;
      this.wordIndex++;
      //Pause before start typing
      typeSpeed = 500;
   }
   
    setTimeout(()=>this.type(),500)
}
//on Load

document.addEventListener('DOMContentLoaded',init);

function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
   const wait = txtElement.getAttribute('data-wait');
   new TypeWriter(txtElement,words,wait)

}