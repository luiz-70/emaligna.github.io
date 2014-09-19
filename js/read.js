/* Function to check acceptance of string. Assumes this matrix format:
	 * Matrix A NxM is the transition matrix, N=states, M=alphabet symbols, q0=first state and F=final states. 
	 * Example N={a,b,c}, M={0,1}, q0=a, F={b,c}. 
		      0  1
		    a[b][b]
		A=  b[c][b] so A={{a,b},{c,b},{a,a}}
		    c[a][a]
		States should be easily handled by using their index on the matrix, in the example a=0, b=1, c=2.
		Symbols could also be handled that way.
	 */

	 //test: ejemplo de entrada de la profe. 
	 /*   0,1
	  *   0-1&0
	  *   1-1&2
	  *   *2-2&2
	  */
	  //global variables
	  var ag; //transition matrix
	  var ng; //states
	  var mg; //alphabet
	  var q0g;//initial state
	  var fg; //final states
	  var mg1;
	 
 

	 function parse(afd){
		var lines= afd.split('\n');
		ag=[];
		ng=[];
		//symbols asigned from first line
		mg=lines[0].split(',');
		//for(var i=0;i<mg.length;i++)
		//mg[i]=parseInt(mg[i]);
		//initial state, read from 2nd line
		q0g=lines[1].charAt(0)=='*'? lines[1].charAt(1):lines[1].charAt(0);
		fg=[];
		for(var i=1;i<lines.length;i++){
			//add states, if it has * add it to the final stage array aswell
			var temp=lines[i].split("-");
			if(temp[0].charAt(0)=='*'){
				fg.push(parseInt(temp[0].substr(1,temp[0].length)));
				ng.push(parseInt(temp[0].substr(1,temp[0].length)))
			}
			else{
				ng.push(temp[0]);
			}
			//add line to the matrix
			if(temp[1])ag[i-1]=temp[1].split('&');
		}
		//Testing
		console.log("a: "+ag);
		console.log(ag);
		console.log("n: "+ng);
		console.log(ng);
		console.log("m: "+mg);
		console.log(mg);
		console.log("q0: "+q0g);
		console.log(q0g);
		console.log("f: "+fg);
		console.log(fg);
	 }
	 var fileName;
	function readSingleFile(evt) {
	    //Retrieve the first (and only!) File from the FileList object.
	    var fl = evt.target.files[0];

	    if (fl) {
	      var r = new FileReader();
	      r.onload = function(e){ 
	      var contents = e.target.result;
	      console.log("Content:\n"+contents);

	      parse(contents);
	      
	      //fl.type= "Atomata Finito Determinista";
	      	console.log(fl.name)
	      	var fileName = fl.name;
	        //alert( "El archivo se cargó de manera correcta \n" 
	        //    	+"Nombre: " + fl.name + "\n"
	        //	  	+"type: " + (fl.type? fl.type : fl.name.split('.')[1]=="afd"? "Automata": "undefined") + "\n"
	        //    	+"size: " + fl.size + " bytes"+"\n")
	        
	        document.getElementById('whereIsTheFile').value = fileName;
	      }
	      r.readAsText(fl);
	    } 
	    else { 
	      alert("Falló la subida del archivo");
	    }
  	}
	 //Expected input: char[] m, char c where m is symbol array and c is one to evaluate
	 //this function translates symbols from char to int
	 //returns an int indicating index of char, or -1 if invalid char is given
	 function symbol(m, c){
		return m.indexOf(c);
	 }
	 //this function translates states from char to int // may not be necessary depending on the prev handling
	 //returns an int indicating index of state, or -1 if invalid char is given
	 function state(n, q){
		return n.indexOf(q);
	 }
	 //Expected input char[][]a, int q, char c, where q is the current state and c is the input symbol
	 //Returns an int for the new current state;
	 function transition(a,m,n, q, c){
		console.log("trans q: "+q);
		console.log(typeof c);
		console.log(m.indexOf(c));
		
		if(q!=-1 && symbol(m,c)!=-1){
			console.log("TRanstititon");
			return n.indexOf(a[q][symbol(m,c)]);
		}
		return -1;
	 }
	 // Expected Parameters: char[][] a, char[] n, char[] m, char q0, char[] f , string s 
	 //Returns true or false accordingly.
	 function eval(a,n,m,q0,f,s){
		//curState is an int
		var curState=state(n,q0);
		console.log("initial state: "+n[curState]);
		for( i=0; i<s.length; i++){
			console.log("Current state: "+n[curState]);
			console.log("Current symbol: "+s.charAt(i));
			console.log("transition says: "+transition(a,m,n,curState,s.charAt(i)));
			
			curState=transition(a,m,n,curState,s.charAt(i));
		}
		if(f.indexOf(n[curState])!=-1){
			
			var success = "<br><div class='alert alert-success'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>La cadena <strong>"+s+"</strong> es aceptada</div>";
			document.getElementById("placeAlert").innerHTML = success;
			return true;
		} 
		else{
			var danger = "<br><div class='alert alert-danger'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>La cadena <strong>"+s+"</strong> no es aceptada</div>";
			document.getElementById("placeAlert").innerHTML = danger;
			return false;	
		} 
	 }



	 //Validate browser
	 function validateBrowserForFileUpload(){
		if (window.File && window.FileReader && window.FileList && window.Blob) {
		// Great success! All the File APIs are supported.
		}
		else {
			alert('The File APIs are not fully supported in this browser.');
		}
	}
	//
	
	var cadena;
	 function makeEvaluation(){
		 //if(mg1.length>0)mg=mg1;
		mg1=new Array(mg.length);
		cadena = document.getElementById('stringEvaluar').value;
		console.log("Evaluating: "+cadena);
		cadena=cadena.split("");
		for(var i=0;i<mg.length;i++){
			mg[i]=mg[i].substring(0,1);
		}
		for(var i=0;i<cadena.length;i++){
			
			if(mg.indexOf(cadena[i].toString())>=0)cadena[i]=mg.indexOf(cadena[i].toString());
			else if(mg.indexOf(cadena[i]))cadena[i]=mg.indexOf(cadena[i].substring(0,1));
			//console.log(cadena[i]);
		}
		for(var i=0;i<mg.length;i++){
			mg1[i]=i;
		}
		console.log(mg);
		//console.log(cadena);
		evaluar(cadena,0,0)
		
		//console.log(eval(ag,ng,mg,q0g,fg,s))
	}
	function revisacadena(c){
		var s="";
		for(var i=0;i<c.length;i++)
		s+=mg[c[i]];
		return s;
	}
	function evaluar(c,i,e){
		if(c.length==i){
			if(fg.lastIndexOf(parseInt(e))>=0){
				var success = "<br><div class='alert alert-success'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>La cadena <strong>"+revisacadena(c)+"</strong> es aceptada</div>";
				document.getElementById("placeAlert").innerHTML = success;
			}else{
				var danger = "<br><div class='alert alert-danger'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>La cadena <strong>"+revisacadena(c)+"</strong> no es aceptada</div>";
				document.getElementById("placeAlert").innerHTML = danger;
			}
		}else{
		console.log("ELEMENTO NO.  "+i);
		console.log("cadena: "+c.join(""));
		console.log("elemento:"+c[i])
		console.log("est-actual:"+e);
		console.log("est-siguente:"+ag[parseInt(e)][mg1.indexOf(parseInt(c[i]))]);
			evaluar(c,i+1,ag[parseInt(e)][parseInt(mg1.indexOf(parseInt(c[i])))]);
		}
	}
	validateBrowserForFileUpload();

	 
 

  document.getElementById('fileinput').addEventListener('change', readSingleFile, false);


	 //string a evaluar
	 //var s="0000001001";
	 
	 //console.log(eval(a,n,m,q0,f,s));


