<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
    * Display a listing of the resource.
    *
    * @return \Illuminate\Http\Response
    */
   public function index()
   {
       return User::all();
   }

   public function store(Request $request)
   {
       $request['password'] = md5($request['password']);
       User::create($request->all());
   }

   public function show($id)
   {
       return User::findOrFail($id);
   }

   public function update(Request $request, $id)
   {
       $User = User::findOrFail($id);
       $User->update($request->all());
   }

   public function destroy($id)
   {
       $User = User::findOrFail($id);
       $User->delete();
   }

   public function getLogin(Request $request){
       return User::where('email', '=', $request['email'])
        ->where('password','=',md5($request['password']))
        ->firstOrFail();
   }
}
