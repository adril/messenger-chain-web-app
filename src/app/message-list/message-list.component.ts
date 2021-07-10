import { Component, OnInit } from "@angular/core";
import { Message } from "../messenger-chain/entity/message";
import { MessengerChainService } from "../messenger-chain/messenger-chain.service";

@Component({
  selector: "app-message-list",
  templateUrl: "./message-list.component.html",
  styleUrls: ["./message-list.component.scss"],
})
export class MessageListComponent implements OnInit {
  messages: Message[];

  constructor(private messengerChainService: MessengerChainService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.messengerChainService.loadBlocks().subscribe((blocks) => {
      this.messages = [].concat.apply(
        [],
        blocks.map((block) => {
          return block.messages;
        })
      );
      // console.log(blocks);
      // console.log(this.messages);
    });
  }
}
