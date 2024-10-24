@extends('Admin.layout')

@section('content')

<div class="container-fluid mt-4">
    <div class="row">
        <div class="col-md-3">
            <div class="list-group">
                <a href="{{ route('admin.dashboard') }}" class="list-group-item list-group-item-action active">
                    Dashboard
                </a>
                <a href="{{ route('admin.truck_requests') }}" class="list-group-item list-group-item-action">
                    Truck Requests
                </a>
                <a href="#" class="list-group-item list-group-item-action">
                    <form action="{{ route('admin.logout') }}" method="POST">
                        @csrf
                        <button type="submit" class="btn btn-link nav-link">Logout</button>
                    </form>
                </a>
            </div>
        </div>

        <div class="col-md-9">
            <h3 class="mt-4">Truck Requests</h3>
            <table class="table table-bordered mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Address</th>
                        <th>Weight</th>
                        <th>Size</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($truckRequests as $request)
                        <tr>
                            <td>{{ $request->id }}</td>
                            <td>{{ $request->user->name }}</td>
                            <td>{{ $request->address }}</td>
                            <td>{{ $request->weight }}</td>
                            <td>{{ $request->size }}</td>
                            <td class="badge {{ $request->status == 0 ? 'bg-warning' : ($request->status == 1 ? 'bg-primary' : 'bg-success')}}">
                                {{ $request->status == 0 ? 'Pending' : ($request->status == 1 ? 'In Progress' : 'Completed')}}
                            </td>
                            <td>{{ $request->date }}</td>
                            <td>
                                <a href="{{ route('admin.inprogress', $request->id) }}" class="btn btn-sm btn-primary">In Progress</a>
                                <a href="{{ route('admin.approve', $request->id) }}" class="btn btn-sm btn-success">Approve</a>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>

@endsection