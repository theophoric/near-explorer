import React from "react";

import { DatabaseConsumer } from "../../context/DatabaseProvider";
import TransactionsApi, * as T from "../../libraries/explorer-wamp/transactions";

import BatchTransactionIcon from "../../../public/static/images/icon-m-batch.svg";

import ActionRow from "./ActionRow";
import ActionRowBlock, { ViewMode } from "./ActionRowBlock";
import ActionsList from "./ActionsList";

export interface Props {
  actions: T.Action[];
  transaction: T.Transaction;
  viewMode?: ViewMode;
}

interface State {
  status?: T.ExecutionStatus;
}

export default class extends React.Component<Props, State> {
  static defaultProps = {
    viewMode: "sparse",
  };

  state: State = {};

  componentDidMount() {
    this.fetchStatus();
  }

  fetchStatus = async () => {
    const status = await new TransactionsApi().getTransactionStatus(
      this.props.transaction
    );
    this.setState({ status });
  };

  render() {
    const { transaction, viewMode } = this.props;
    const { status } = this.state;
    if (!transaction.actions) {
      return <></>;
    }
    if (transaction.actions.length !== 1) {
      return (
        <DatabaseConsumer>
          {(context) => (
            <ActionRowBlock
              viewMode={viewMode}
              transaction={transaction}
              icon={<BatchTransactionIcon />}
              title={"Batch Transaction"}
              status={status}
              isFinal={
                context.finalTimestamp > 0
                  ? transaction.blockTimestamp <= context.finalTimestamp
                  : undefined
              }
            >
              <ActionsList
                actions={transaction.actions}
                transaction={transaction}
                viewMode={viewMode}
                detalizationMode="minimal"
              />
            </ActionRowBlock>
          )}
        </DatabaseConsumer>
      );
    }
    return (
      <DatabaseConsumer>
        {(context) => (
          <ActionRow
            action={transaction.actions[0]}
            transaction={transaction}
            viewMode={viewMode}
            detalizationMode="detailed"
            status={status}
            isFinal={
              context.finalTimestamp > 0
                ? transaction.blockTimestamp <= context.finalTimestamp
                : undefined
            }
          />
        )}
      </DatabaseConsumer>
    );
  }
}
