import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Message } from "../messenger-chain/entity/message";
import { MessengerChainService } from "../messenger-chain/messenger-chain.service";

@Component({
  selector: "app-message-form",
  templateUrl: "./message-form.component.html",
  styleUrls: ["./message-form.component.scss"],
})
export class MessageFormComponent implements OnInit {
  message: Message = new Message(
    null,
    this.messengerChainService.myWalletAddress,
    null
  );

  constructor(
    private messengerChainService: MessengerChainService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    console.log(form);
    console.log("this.message");
    console.log(this.message);
    this.messengerChainService
      .sendMessage(this.message)
      .subscribe((message) => {
        console.log(message);
        console.log("success");
        this.message = new Message(
          null,
          this.messengerChainService.myWalletAddress,
          null
        );
        this.showSuccess();
      });
  }

  showSuccess() {
    this.toastrService.success(
      "Message is sent! And block is ready to be mint",
      "Success!"
    );
  }
}
