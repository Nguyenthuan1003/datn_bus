<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendEmail extends Mailable
{
    use Queueable, SerializesModels;

    public $userName;
    public $title;
    public $codeBill;
    public $startLocation;
    public $endLocation;
    public $pickUpLocation;
    public $payLocation;
    public $startTime;
    public $seats;
    public $content;
    public $codeTickets;

    /**
     * Create a new content instance.
     *
     * @return void
     */
    public function __construct(
        $userName,
        $title,
        $content,
        $codeBill,
        $startLocation,
        $endLocation,
        $pickUpLocation,
        $payLocation,
        $startTime,
        $seats,
        $codeTickets
    )
    {
        $this->userName = $userName;
        $this->title = $title;
        $this->codeBill = $codeBill;
        $this->startLocation = $startLocation;
        $this->endLocation = $endLocation;
        $this->pickUpLocation = $pickUpLocation;
        $this->payLocation = $payLocation;
        $this->startTime = $startTime;
        $this->seats = $seats;
        $this->content = $content;
        $this->codeTickets = $codeTickets;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject($this->title)
                    ->view($this->content);
    }
}
