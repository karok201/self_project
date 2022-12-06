<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     *
     * @param  \App\Http\Requests\Auth\LoginRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();

        $request->session()->regenerate();

        return redirect()->intended(RouteServiceProvider::HOME);
    }

    public function authorizeByPhone(Request $request)
    {
        $request->validate([
            'phone' => 'required|min:11|numeric'
        ]);

        $code = '';

        for ($i = 0; $i < 5; ++$i) {
            $code .= random_int(0,9);
        }

        $user = User::updateOrCreate([
            'phone' => $request->phone,
        ]);
        $user->code = $code;
        $user->save();

        Http::post("https://sms.ru/sms/send?api_id=FEC9F9C8-D2C4-DE1C-D91F-682B31EE5499&to=$request->phone&msg=$code&json=1");

        return [
            'phoneCode' => true,
        ];
    }

    public function compareCode(Request $request)
    {
        $request->validate([
            'code' => 'required|min:5|numeric'
        ]);

        $user = User::where('code', $request->code)->first();

        if ($user) Auth::login($user);

        return [
            'user' => $user,
        ];
    }

    /**
     * Destroy an authenticated session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
