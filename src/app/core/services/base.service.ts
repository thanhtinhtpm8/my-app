import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';



export interface IRequestOptions {
  headers?: HttpHeaders;
  context?: HttpContext;
  observe?: "body";
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: "json";
  withCredentials?: boolean;
}


@Injectable({
  providedIn: 'root',
})
export class BaseService {
  private apiUrl: string = environment.apiURL;
  endPoint: string = "";
  headers = localStorage.getItem('tokenAccess') == null ?
    new HttpHeaders({'Content-Type': 'application/json', Accept: '*/*'}) :
    new HttpHeaders({
      'Content-Type': 'application/json', Accept: '*/*',
      Authorization: `Bearer ${localStorage.getItem('tokenAccess')}`,
      allowedHeaders: "Content-Type,Authorization"
    });

  // Http Options
  httpOptions = {
    headers: this.headers,
    reportProgress:true,
  };
  /**
   * Snackbar options
   */
  
  durationInSeconds = 5; // units: ms

  constructor(
    private http: HttpClient,
  //  private _snackBar: MatSnackBar,
  //  public dialog: MatDialog
  ) { }

  /**
 * GET all request
 * @returns {Observable<T>}
 */
  public GetAll<T>(): Observable<T> {
    this.setHeader();
    return this.http.get<T>(this.apiUrl + this.endPoint, this.httpOptions);
  }

  /**
 * GET request by ID
 * @param {any} id key
 * @returns {Observable<T>}
 */
  public GetById<T>(id: any): Observable<T> {
    this.setHeader();
    return this.http.get<T>(`${this.apiUrl}${this.endPoint}/${id}`, this.httpOptions);
  }


  /**
* GET request (mở rộng thêm url phía sau endPoint)
* @param {any} extendPoint
* @returns {Observable<T>}
*/
  public GetbyExt<T>(extendPoint: any): Observable<T> {
    this.setHeader();
    return this.http.get<T>(this.apiUrl + this.endPoint + extendPoint, this.httpOptions);
  }
  public GetFilebyExt<T>(extendPoint: any): Observable<T> {
    this.setHeaderDownnloadFile();
    return this.http.get<T>(this.apiUrl + this.endPoint + extendPoint, this.httpOptions);
  }

  /**
 * POST request
 * @param {any} data body of the request.
 * @returns {Observable<T>}
 */

  public Post<T>(data: any): Observable<T> {
    this.setHeader();
    console.log(this.httpOptions);
    return this.http.post<T>(this.apiUrl + this.endPoint, data, this.httpOptions);
  }

  /**
* GET request (mở rộng thêm url phía sau endPoint)
* @param {any} extendPoint
* @returns {Observable<T>}
*/
public PostbyExt<T>(extendPoint: any,data:any): Observable<T> {
  this.setHeader();
  return this.http.post<T>(this.apiUrl + this.endPoint + extendPoint,data, this.httpOptions);
}
public PostFilebyExt<T>(extendPoint: any,data:any): Observable<T> {
  this.setHeaderUpLoadFile();
  return this.http.post<T>(this.apiUrl + this.endPoint + extendPoint,data, this.httpOptions);
}

  /**
   * DELETE request
   *  @param {any} id key
   * @returns {Observable<T>}
   */
  public DeleteId<T>(id: any): Observable<T> {
    this.setHeader();
    return this.http.delete<T>(`${this.apiUrl}${this.endPoint}/${id}`, this.httpOptions);

  }

  /**
  * PUT request
  *  @param {any} id key
  * @param {any} data body of the request.
  * @returns {Observable<T>}
  */
  public Put<T>(id: any, data: any): Observable<T> {
    this.setHeader();
    return this.http.put<T>(`${this.apiUrl}${this.endPoint}/${id}`, data, this.httpOptions);
  }

    /**
* @param {any} extendPoint
* @returns {Observable<T>}
*/
public PutbyExt<T>(extendPoint: any, data:any): Observable<T> {
  this.setHeader();
  return this.http.put<T>(this.apiUrl + this.endPoint + extendPoint,data, this.httpOptions);
}

  /**
  * DELETE request (mở rộng thêm url phía sau endPoint)
  * @param {any} extendPoint
  * @returns {Observable<T>}
  */
  public DeletebyExt<T>(extendPoint: any): Observable<T> {
    this.setHeader();
    return this.http.delete<T>(this.apiUrl + this.endPoint + extendPoint, this.httpOptions);
  }

  // Error handling
  handleError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse);
   // this.dialog.closeAll();
    let errorMessage = '';
    //if (error instanceof ErrorEvent) {
      // Get client-side error
      //errorMessage = error.message;
    //} else {
      // Get server-side error

      //}
    // if((!environment.production && ![401,500,400].includes(errorResponse.status)) || environment.production) {
    //   errorMessage = `Error Code: ${errorResponse.status}\nMessage: ${errorResponse.message}`;
    //   this._snackBar.open(errorMessage, 'Đóng', {
    //     horizontalPosition: this.horizontalPosition,
    //     verticalPosition: this.verticalPosition,
    //     duration: this.durationInSeconds * 1000
    //   });
    // }
    if(environment.production) {
      errorMessage = `Error Code: ${errorResponse.status}\nMessage: ${errorResponse.message}`;
      // this._snackBar.open(errorMessage, 'Đóng', {
      //   horizontalPosition: this.horizontalPosition,
      //   verticalPosition: this.verticalPosition,
      //   duration: this.durationInSeconds * 1000
      // });
    }
    return throwError(() => {
      return errorMessage;
    });
  }

  initOptions(options: any) {
    this.httpOptions = Object.assign(this.httpOptions, options);
    console.log(this.httpOptions);
  }

  setHeader() {
    this.headers = localStorage.getItem('tokenAccess') == null ?
    new HttpHeaders({'Content-Type': 'application/json', Accept: '*/*'}) :
    new HttpHeaders({
      'Content-Type': 'application/json', Accept: '*/*',
      Authorization: `Bearer ${localStorage.getItem('tokenAccess')}`,
      allowedHeaders: "Content-Type,Authorization"
    });
    // Http Options
    const httpOptions = {
      headers: this.headers,
    };

    this.initOptions(httpOptions);
  }
  setHeaderUpLoadFile() {
    this.headers = localStorage.getItem('tokenAccess') == null ?
    new HttpHeaders({Accept: '*/*'}) :
    new HttpHeaders({
      
      Authorization: `Bearer ${localStorage.getItem('tokenAccess')}`,
      allowedHeaders: "Content-Type,Authorization"
    });
    // Http Options
    const httpOptions = {
      headers: this.headers,
    };
    this.initOptions(httpOptions);
  }
  setHeaderDownnloadFile() {
    this.headers = localStorage.getItem('tokenAccess') == null ?
    new HttpHeaders({Accept: '*/*'}) :
    new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('tokenAccess')}`,
      allowedHeaders: "Content-Type,Authorization"
    });
    // Http Options
    const httpOptions = {
      headers: this.headers,
      responseType: 'blob'
    };
    this.initOptions(httpOptions);
  }
}
