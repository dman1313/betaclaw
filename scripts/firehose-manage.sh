#!/bin/bash
# Firehose Delivery Service Manager

SCRIPT="/home/node/.openclaw/workspace/scripts/firehose-delivery.py"
LOG="/tmp/firehose-delivery.log"
PID=$(pgrep -f "firehose-delivery.py")

case "$1" in
  start)
    if [ -n "$PID" ]; then
      echo "Service already running (PID: $PID)"
      exit 1
    fi
    echo "Starting Firehose delivery service..."
    nohup python3 -u "$SCRIPT" > "$LOG" 2>&1 &
    sleep 2
    echo "Started PID: $(pgrep -f 'firehose-delivery.py')"
    echo "Logs: tail -f $LOG"
    ;;
  stop)
    if [ -z "$PID" ]; then
      echo "Service not running"
      exit 1
    fi
    echo "Stopping service (PID: $PID)..."
    kill "$PID"
    sleep 1
    echo "Stopped"
    ;;
  restart)
    $0 stop
    sleep 2
    $0 start
    ;;
  status)
    if [ -n "$PID" ]; then
      echo "✅ Running (PID: $PID)"
      echo "Recent logs:"
      tail -10 "$LOG"
    else
      echo "❌ Not running"
    fi
    ;;
  logs)
    tail -50 "$LOG"
    ;;
  *)
    echo "Usage: $0 {start|stop|restart|status|logs}"
    exit 1
    ;;
esac
