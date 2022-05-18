<template>
  <div class="status-indicator" :class="getStatusColor(props.status)">
    <span>{{ props.status }}</span>
  </div>
</template>
<script setup>
// in <script setup>
const props = defineProps({
  status: String,
});

function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case "paid":
      return "status-indicator--paid";
    case "pending":
      return "status-indicator--pending";
    case "draft":
      return "status-indicator--draft";
  }
}
</script>
<style lang="scss" setup>
@import "../../sass/breakpoints";
@import "../../sass/_colors";
@import "../../sass/functions";

.status-indicator {
  mix-blend-mode: normal;
  border-radius: 6px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
  width: toRem(104, 18);
  height: toRem(40, 18);
  justify-self: flex-end;
  padding-left: 8px;
  span {
    font-style: normal;
    font-weight: 700;
    font-size: toRem(12, 18);
    line-height: toRem(15, 18);
    letter-spacing: -0.25px;
    position: relative;
    z-index: 1;
  }

  span::before {
    content: "";
    top: toRem(4, 18);
    left: -(toRem(16, 18));
    bottom: 0;
    position: absolute;
    width: toRem(8, 18);
    height: toRem(8, 18);
    border-radius: 100%;
  }
}

.status-indicator--paid {
  background-color: rgba(#33d69f, 0.06);

  span {
    color: #33d69f;
  }

  span::before {
    background-color: #33d69f;
  }
}

.status-indicator--pending {
  background-color: rgba(#ff8f00, 0.06);

  span {
    color: #ff8f00;
  }

  span::before {
    background-color: #ff8f00;
  }
}

.--light-mode {
  .status-indicator--draft {
    background-color: rgba(#373b53, 0.06);

    span {
      color: #373b53;
    }

    span::before {
      background-color: #373b53;
    }
  }
}

.--dark-mode {
  .status-indicator--draft {
    background-color: rgba($blue-gray-light, 0.06);

    span {
      color: $blue-gray-light;
    }

    span::before {
      background-color: $blue-gray-light;
    }
  }
}
</style>
