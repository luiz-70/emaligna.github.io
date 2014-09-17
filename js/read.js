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
	 //Expected input: char[] m, char c where m is symbol array and c is one to evaluate
	 //this function translates symbols from char to int
	 //returns an int indicating index of char, or -1 if invalid char is given


	 //test: ejemplo de entrada de la profe. 
	 /*   0,1
	  *   0-1&0
	  *   1-1&2
	  *   *2-2&2
	  */
	  //variables a construir
	 

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
		if(q!=-1 && symbol(m,c)!=-1){
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
			console.log("Current symbol: "+symbol(m,s.charAt(i)));
			console.log("transition says: "+transition(a,m,n,curState,s.charAt(i)));
			curState=transition(a,m,n,curState,s.charAt(i));
		}
		if(f.indexOf(n[curState])!=-1){
			alert('La cadena ' +s +' es aceptada')
			return true;
		} 
		else{
			alert('La cadena ' +s +' no es aceptada :(')
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

	 function getAFD(afdpath){
	 	var Connect = new HttpRequest();

	 	Conect.open("GET", afdpath, false);
	 	Connect.setRequestHeader("Content-Type", "text");
	 	connect.send(null);


	 	var TheDocument = Connect.response;

	 	return TheDocument;
	 }

	 function makeEvaluation(){
	 	var s = document.getElementById('stringEvaluar').value;
	 	console.log(s)
	 	var n=['0','1','2'];
		var m=['0','1'];
		var f=['2'];
		var a=[['1','0'],['1','2'],['2','2']];
		var q0='0';
	 	console.log(eval(a,n,m,q0,f,s))
	 }

	 validateBrowserForFileUpload();

	 
	 //string a evaluar
	 //var s="0000001001";
	 
	 //console.log(eval(a,n,m,q0,f,s));


