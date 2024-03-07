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
    public $startTime;
    public $seats;
    public $content;

    /**
     * Create a new content instance.
     *
     * @return void
     */
    public function __construct($userName,$title, $content, $codeBill, $startLocation, $endLocation, $startTime, $seats)
    {
        $this->userName = $userName;
        $this->title = $title;
        $this->codeBill = $codeBill;
        $this->startLocation = $startLocation;
        $this->endLocation = $endLocation;
        $this->startTime = $startTime;
        $this->seats = $seats;
        $this->content = $content;
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
