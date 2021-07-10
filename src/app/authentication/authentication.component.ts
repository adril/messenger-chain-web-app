import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { MessengerChainService } from "../messenger-chain/messenger-chain.service";

export class Authentication {
  privateKey: string;
  publicKey: string;
  constructor(privateKey: string, publicKey: string = null) {
    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }
}

@Component({
  selector: "app-authentication",
  templateUrl: "./authentication.component.html",
  styleUrls: ["./authentication.component.scss"],
})
export class AuthenticationComponent implements OnInit {
  authentication: Authentication = new Authentication(
    this.messengerChainService.privateKey,
    this.messengerChainService.myWalletAddress
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
    this.messengerChainService.updatePrivateKey(this.authentication.privateKey);
    this.authentication.publicKey = this.messengerChainService.myWalletAddress;
    this.showSuccess();
    // INFO: hard fix to avoid to synch data
    window.location.reload();
  }

  showSuccess() {
    this.toastrService.success("Private key is updated", "Success!");
  }
}
