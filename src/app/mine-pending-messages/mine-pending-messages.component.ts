import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { MessengerChainService } from "../messenger-chain/messenger-chain.service";

@Component({
  selector: "app-mine-pending-messages",
  templateUrl: "./mine-pending-messages.component.html",
  styleUrls: ["./mine-pending-messages.component.scss"],
})
export class MinePendingMessagesComponent implements OnInit {
  constructor(
    private messengerChainService: MessengerChainService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    this.messengerChainService
      .minePendingMessages()
      .subscribe((r) => this.showSuccess());
  }

  showSuccess() {
    this.toastrService.success("Block has been mint", "Success!");
  }
}
