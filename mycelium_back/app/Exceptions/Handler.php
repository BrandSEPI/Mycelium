<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpKernel\Exception;



class Handler extends ExceptionHandler
{
   
    protected $dontReport = [
        //
    ];

   
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

   

    public function render($request, Throwable $e)
    {

        if($e instanceof \Illuminate\Database\QueryException){
            $errorCode = $e->errorInfo[1];          
            switch ($errorCode) {
                case 1062:
                    return response([
                        'message'=>'Duplicate Entry'
                    ],Response::HTTP_NOT_FOUND);    
                    break;
                case 1364:
                    return response([
                        'message'=>$e->getMessage()
                    ],Response::HTTP_NOT_FOUND);                        
                    break;      
            }
         }
        
        if ($request->is('api/login') && !Auth::attempt($request->only('email', 'password'))) {
                return response()->json([
                    'message' => 'Invalid login details'
                ], 401);
        };
        
        if ($e instanceOf Exception\NotFoundHttpException)
        {
            return response()->json([
                'message' => 'Lost in mycelium'
            ], 404);
        }

        if ($e instanceof Exception\HttpException) {
            return response()->json([
                'message' => 'Internal server error'
            ], 500);
        }
            
            
        return parent::render($request, $e);
    }

}


